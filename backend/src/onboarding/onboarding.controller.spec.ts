import { Test, TestingModule } from '@nestjs/testing';
import { OnboardingController } from './onboarding.controller';
import { OnboardingService } from './onboarding.service';

describe('OnboardingController', () => {
  let controller: OnboardingController;
  const mockOnboardingService = {
    getProfile: jest.fn(),
    updateProfile: jest.fn(),
    signCommitment: jest.fn(),
    completeScheduling: jest.fn(),
    completePayment: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OnboardingController],
      providers: [
        {
          provide: OnboardingService,
          useValue: mockOnboardingService,
        },
      ],
    }).compile();

    controller = module.get<OnboardingController>(OnboardingController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should skip payment', async () => {
    const req = { user: { id: 'user-1' } };
    await controller.skipPayment(req);
    expect(mockOnboardingService.completePayment).toHaveBeenCalledWith('user-1');
  });
});
