import { Stack, TextInput, Select, Paper, Group } from '@mantine/core';
import { useCheckoutStore } from '@/stores/useCheckoutStore';

export function ShippingStep() {
  const { shippingInfo, setShippingInfo } = useCheckoutStore();

  return (
    <Paper shadow="sm" p="xl" withBorder>
      <Stack gap="md">
        <TextInput
          label="Full Name"
          placeholder="John Doe"
          required
          value={shippingInfo.fullName}
          onChange={(e) => setShippingInfo({ fullName: e.target.value })}
        />

        <TextInput
          label="Address"
          placeholder="123 Main St, Apt 4B"
          required
          value={shippingInfo.address}
          onChange={(e) => setShippingInfo({ address: e.target.value })}
        />

        <TextInput
          label="City"
          placeholder="San Francisco"
          required
          value={shippingInfo.city}
          onChange={(e) => setShippingInfo({ city: e.target.value })}
        />

        <Group grow>
          <TextInput
            label="State"
            placeholder="CA"
            required
            value={shippingInfo.state}
            onChange={(e) => setShippingInfo({ state: e.target.value })}
          />
          <TextInput
            label="ZIP Code"
            placeholder="94103"
            required
            value={shippingInfo.zipCode}
            onChange={(e) => setShippingInfo({ zipCode: e.target.value })}
          />
        </Group>

        <Select
          label="Country"
          placeholder="Select country"
          required
          value={shippingInfo.country}
          onChange={(value) => setShippingInfo({ country: value || '' })}
          data={[
            'United States',
            'Canada',
            'United Kingdom',
            'Germany',
            'France',
            'Australia',
            'Japan',
          ]}
        />
      </Stack>
    </Paper>
  );
}
