'use client';

import { useEffect } from 'react';
import { Stack, Stepper, Button, Group } from '@mantine/core';
import { PrototypeLayout } from '@/components/PrototypeLayout';
import { PrototypeToolbar } from '@/components/PrototypeToolbar';
import { useCheckoutStore, CheckoutStep } from '@/stores/useCheckoutStore';
import { Scenario } from '@/types';
import { CartStep } from './components/CartStep';
import { ShippingStep } from './components/ShippingStep';
import { PaymentStep } from './components/PaymentStep';
import { ConfirmationStep } from './components/ConfirmationStep';

const STEPS: CheckoutStep[] = ['cart', 'shipping', 'payment', 'confirmation'];

const STEP_LABELS = {
  cart: 'Cart',
  shipping: 'Shipping',
  payment: 'Payment',
  confirmation: 'Confirmation',
};

export default function CheckoutDemoPage() {
  const { scenario, currentStep, cart, setScenario, setStep, reset } =
    useCheckoutStore();

  useEffect(() => {
    // Initialize with normal scenario on mount
    setScenario('normal');
  }, [setScenario]);

  const handleScenarioChange = (newScenario: Scenario) => {
    setScenario(newScenario);
  };

  const currentStepIndex = STEPS.indexOf(currentStep);

  const canProceed = () => {
    if (currentStep === 'cart') {
      return cart.length > 0;
    }
    // Add more validation as needed
    return true;
  };

  const handleNext = () => {
    const nextIndex = currentStepIndex + 1;
    if (nextIndex < STEPS.length) {
      setStep(STEPS[nextIndex]);
    }
  };

  const handleBack = () => {
    const prevIndex = currentStepIndex - 1;
    if (prevIndex >= 0) {
      setStep(STEPS[prevIndex]);
    }
  };

  return (
    <PrototypeLayout
      title="Checkout Flow"
      description="Multi-step checkout process with cart, shipping, and payment"
    >
      <PrototypeToolbar
        currentScenario={scenario}
        onScenarioChange={handleScenarioChange}
        onReset={reset}
      />

      <Stack gap="xl">
        <Stepper
          active={currentStepIndex}
          onStepClick={(stepIndex) => {
            // Allow navigation to previous steps
            if (stepIndex <= currentStepIndex) {
              setStep(STEPS[stepIndex]);
            }
          }}
        >
          {STEPS.map((step) => (
            <Stepper.Step key={step} label={STEP_LABELS[step]} />
          ))}
        </Stepper>

        {currentStep === 'cart' && <CartStep />}
        {currentStep === 'shipping' && <ShippingStep />}
        {currentStep === 'payment' && <PaymentStep />}
        {currentStep === 'confirmation' && <ConfirmationStep />}

        {currentStep !== 'confirmation' && (
          <Group justify="space-between">
            <Button
              variant="subtle"
              onClick={handleBack}
              disabled={currentStepIndex === 0}
            >
              Back
            </Button>
            <Button onClick={handleNext} disabled={!canProceed()}>
              {currentStep === 'payment' ? 'Place Order' : 'Continue'}
            </Button>
          </Group>
        )}
      </Stack>
    </PrototypeLayout>
  );
}
