import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MissionTemplate } from '../entities/mission-template.entity';
import { MissionAssignment } from '../entities/mission-assignment.entity';
import { Attempt } from '../entities/attempt.entity';
import { GamificationService } from '../gamification/gamification.service';
import { MerciService } from '../merci/merci.service';

@Injectable()
export class MissionsService {
  constructor(
    @InjectRepository(MissionTemplate)
    private templateRepository: Repository<MissionTemplate>,
    @InjectRepository(MissionAssignment)
    private assignmentRepository: Repository<MissionAssignment>,
    @InjectRepository(Attempt)
    private attemptRepository: Repository<Attempt>,
    private gamificationService: GamificationService,
    private merciService: MerciService,
  ) {}

  async getTodayMission(userId: string) {
    const today = new Date().toISOString().split('T')[0];
    let assignment = await this.assignmentRepository.findOne({
      where: { userId, date: today },
      relations: ['template'],
    });

    if (!assignment) {
      assignment = await this.generateMission(userId, today);
    }

    return assignment;
  }

  private async generateMission(userId: string, date: string) {
    // 1. Get user profile/merci to decide domain
    // Simple logic: priority to domain with lowest score if exists
    let selectedDomain = 'motricity';
    const latestMerci = await this.merciService.findById(userId); // Assuming findById returns latest for user or I should add findLatestByPlayer
    // Actually MerciService has findByPlayer
    const results = await this.merciService.findByPlayer(userId);

    if (results.length > 0) {
      const latest = results[0];
      const scores = [
        { name: 'motricity', val: latest.motricity },
        { name: 'emotions', val: latest.emotions },
        { name: 'relationships', val: latest.relationships },
        { name: 'fiveSenses', val: latest.fiveSenses },
        { name: 'intelligence', val: latest.intelligence },
      ];
      scores.sort((a, b) => a.val - b.val);
      selectedDomain = scores[0].name;
    }

    // 2. Pick a template
    const templates = await this.templateRepository.find({ where: { domain: selectedDomain } });
    if (templates.length === 0) {
        // Fallback to any template
        const allTemplates = await this.templateRepository.find();
        if (allTemplates.length === 0) throw new NotFoundException('No mission templates found');
        const randomIndex = Math.floor(Math.random() * allTemplates.length);
        const template = allTemplates[randomIndex];
        const assignment = this.assignmentRepository.create({ userId, templateId: template.id, date });
        return this.assignmentRepository.save(assignment);
    }

    const randomIndex = Math.floor(Math.random() * templates.length);
    const template = templates[randomIndex];

    const assignment = this.assignmentRepository.create({ userId, templateId: template.id, date });
    const saved = await this.assignmentRepository.save(assignment);
    return this.assignmentRepository.findOne({ where: { id: saved.id }, relations: ['template'] });
  }

  async recordAttempt(userId: string, assignmentId: string, notes: string, evidenceUrl?: string) {
    const assignment = await this.assignmentRepository.findOne({
      where: { id: assignmentId, userId },
      relations: ['template'],
    });
    if (!assignment) throw new NotFoundException('Assignment not found');

    const attempt = this.attemptRepository.create({
      userId,
      assignmentId,
      notes,
      evidenceUrl,
      status: 'submitted',
    });

    await this.attemptRepository.save(attempt);

    if (assignment.status !== 'completed') {
      assignment.status = 'completed';
      await this.assignmentRepository.save(assignment);
      await this.gamificationService.addXp(userId, assignment.template.xpReward);
    }

    return attempt;
  }

  async seedTemplates() {
    const count = await this.templateRepository.count();
    if (count > 0) return;

    const templates = [
      { title: 'Tiro de precisión', description: 'Realiza 10 tiros a 6 metros buscando impacto directo.', domain: 'motricity', xpReward: 100, checklist: ['Calentamiento', '10 tiros', 'Registro'] },
      { title: 'Respiración táctica', description: 'Antes de cada tiro importante, realiza 3 respiraciones profundas.', domain: 'emotions', xpReward: 80, checklist: ['Identificar momento', 'Respirar', 'Ejecutar'] },
      { title: 'Feedback positivo', description: 'Después de cada partida, dile algo positivo a tu compañero.', domain: 'relationships', xpReward: 90, checklist: ['Partida jugada', 'Comentario dado'] },
      { title: 'Visualización del terreno', description: 'Cierra los ojos y trata de recordar la posición exacta de las bolas.', domain: 'fiveSenses', xpReward: 110, checklist: ['Observar', 'Cerrar ojos', 'Validar'] },
      { title: 'Análisis de jugada', description: 'Describe por qué elegiste el tiro o el punto en la jugada decisiva.', domain: 'intelligence', xpReward: 120, checklist: ['Jugada clave', 'Justificación'] },
      // Add more to reach 10
      { title: 'Equilibrio estático', description: 'Mantén la posición de tiro durante 5 segundos tras soltar la bola.', domain: 'motricity', xpReward: 100, checklist: ['Lanzamiento', 'Post-lanzamiento'] },
      { title: 'Control de frustración', description: 'Si fallas un tiro, no hagas gestos negativos.', domain: 'emotions', xpReward: 80, checklist: ['Error cometido', 'Calma mantenida'] },
      { title: 'Estrategia compartida', description: 'Consulta con tu equipo la mejor opción antes de jugar la última bola.', domain: 'relationships', xpReward: 90, checklist: ['Consulta', 'Consenso'] },
      { title: 'Escucha de impacto', description: 'Identifica el sonido metálico de un buen impacto.', domain: 'fiveSenses', xpReward: 110, checklist: ['Atención auditiva'] },
      { title: 'Cálculo de distancias', description: 'Estima la distancia de las bolas al boliche antes de medir.', domain: 'intelligence', xpReward: 120, checklist: ['Estimación', 'Medición'] },
    ];

    for (const t of templates) {
      await this.templateRepository.save(this.templateRepository.create(t));
    }
  }
}
