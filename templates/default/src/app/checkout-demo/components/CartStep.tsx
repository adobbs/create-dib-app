import {
  Stack,
  Paper,
  Group,
  Text,
  Button,
  NumberInput,
  Image,
  Badge,
} from '@mantine/core';
import { Trash2 } from 'lucide-react';
import { useCheckoutStore } from '@/stores/useCheckoutStore';

export function CartStep() {
  const { cart, updateQuantity, removeFromCart, getTotal, getItemCount } =
    useCheckoutStore();

  if (cart.length === 0) {
    return (
      <Paper shadow="sm" p="xl" withBorder>
        <Stack align="center" gap="md" py="xl">
          <Text size="lg" c="dimmed">
            Your cart is empty
          </Text>
          <Text size="sm" c="dimmed">
            Switch to a different scenario to see products in your cart
          </Text>
        </Stack>
      </Paper>
    );
  }

  return (
    <Stack gap="md">
      <Group justify="space-between" mb="md">
        <Text size="lg" fw={600}>
          Shopping Cart
        </Text>
        <Badge size="lg">{getItemCount()} items</Badge>
      </Group>

      {cart.map((item) => (
        <Paper key={item.id} shadow="xs" p="md" withBorder>
          <Group align="flex-start" wrap="nowrap">
            {item.image && (
              <Image
                src={item.image}
                alt={item.name}
                width={80}
                height={80}
                radius="md"
              />
            )}
            <Stack gap="xs" style={{ flex: 1 }}>
              <div>
                <Text fw={500}>{item.name}</Text>
                <Text size="sm" c="dimmed" lineClamp={2}>
                  {item.description}
                </Text>
              </div>
              <Group gap="xs">
                <Badge variant="light" size="sm">
                  {item.category}
                </Badge>
                {!item.inStock && (
                  <Badge color="red" size="sm">
                    Out of Stock
                  </Badge>
                )}
              </Group>
            </Stack>
            <Stack gap="xs" align="flex-end">
              <Text fw={600} size="lg">
                ${item.price.toFixed(2)}
              </Text>
              <Group gap="xs">
                <NumberInput
                  value={item.quantity}
                  onChange={(value) =>
                    updateQuantity(item.id, Number(value) || 0)
                  }
                  min={0}
                  max={99}
                  style={{ width: 80 }}
                />
                <Button
                  variant="subtle"
                  color="red"
                  size="sm"
                  onClick={() => removeFromCart(item.id)}
                >
                  <Trash2 size={16} />
                </Button>
              </Group>
            </Stack>
          </Group>
        </Paper>
      ))}

      <Paper shadow="sm" p="lg" withBorder>
        <Group justify="space-between">
          <Text size="xl" fw={600}>
            Total:
          </Text>
          <Text size="xl" fw={700} c="blue">
            ${getTotal().toFixed(2)}
          </Text>
        </Group>
      </Paper>
    </Stack>
  );
}
