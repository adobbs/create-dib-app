import { Stack, Paper, Text, Group, Divider, Badge } from '@mantine/core';
import { CheckCircle } from 'lucide-react';
import { useCheckoutStore } from '@/stores/useCheckoutStore';

export function ConfirmationStep() {
  const { cart, shippingInfo, getTotal, getItemCount } = useCheckoutStore();

  return (
    <Stack gap="lg">
      <Paper shadow="sm" p="xl" withBorder>
        <Stack gap="md" align="center">
          <CheckCircle size={64} color="green" />
          <Text size="xl" fw={600}>
            Order Confirmed!
          </Text>
          <Text c="dimmed">
            Thank you for your order. We&apos;ll send you a confirmation email shortly.
          </Text>
        </Stack>
      </Paper>

      <Paper shadow="sm" p="lg" withBorder>
        <Stack gap="md">
          <Text fw={600} size="lg">
            Order Summary
          </Text>
          <Divider />

          <div>
            <Text size="sm" c="dimmed" mb="xs">
              Items ({getItemCount()})
            </Text>
            {cart.map((item) => (
              <Group key={item.id} justify="space-between" mb="xs">
                <Text size="sm">
                  {item.name} × {item.quantity}
                </Text>
                <Text size="sm" fw={500}>
                  ${(item.price * item.quantity).toFixed(2)}
                </Text>
              </Group>
            ))}
          </div>

          <Divider />

          <Group justify="space-between">
            <Text fw={600}>Total:</Text>
            <Text fw={700} size="lg" c="blue">
              ${getTotal().toFixed(2)}
            </Text>
          </Group>
        </Stack>
      </Paper>

      <Paper shadow="sm" p="lg" withBorder>
        <Stack gap="md">
          <Text fw={600} size="lg">
            Shipping Address
          </Text>
          <Divider />
          <div>
            <Text>{shippingInfo.fullName}</Text>
            <Text size="sm" c="dimmed">
              {shippingInfo.address}
            </Text>
            <Text size="sm" c="dimmed">
              {shippingInfo.city}, {shippingInfo.state} {shippingInfo.zipCode}
            </Text>
            <Text size="sm" c="dimmed">
              {shippingInfo.country}
            </Text>
          </div>
        </Stack>
      </Paper>
    </Stack>
  );
}
