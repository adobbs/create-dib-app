import { Stack, TextInput, Group, Paper } from '@mantine/core';
import { useCheckoutStore } from '@/stores/useCheckoutStore';

export function PaymentStep() {
  const { paymentInfo, setPaymentInfo } = useCheckoutStore();

  return (
    <Paper shadow="sm" p="xl" withBorder>
      <Stack gap="md">
        <TextInput
          label="Card Number"
          placeholder="1234 5678 9012 3456"
          required
          value={paymentInfo.cardNumber}
          onChange={(e) => setPaymentInfo({ cardNumber: e.target.value })}
          maxLength={19}
        />

        <TextInput
          label="Cardholder Name"
          placeholder="John Doe"
          required
          value={paymentInfo.cardName}
          onChange={(e) => setPaymentInfo({ cardName: e.target.value })}
        />

        <Group grow>
          <TextInput
            label="Expiry Date"
            placeholder="MM/YY"
            required
            value={paymentInfo.expiryDate}
            onChange={(e) => setPaymentInfo({ expiryDate: e.target.value })}
            maxLength={5}
          />
          <TextInput
            label="CVV"
            placeholder="123"
            required
            value={paymentInfo.cvv}
            onChange={(e) => setPaymentInfo({ cvv: e.target.value })}
            maxLength={4}
          />
        </Group>
      </Stack>
    </Paper>
  );
}
