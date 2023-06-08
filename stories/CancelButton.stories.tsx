import type { Meta, StoryObj } from '@storybook/react';
import { CancelButton } from '~/components/common/modal/buttons';

const story: Meta<typeof CancelButton> = {
  title: 'Cancel Button',
  component: CancelButton,
};

type Story = StoryObj<typeof CancelButton>;

export const Default: Story = {
  render: (args) => <CancelButton {...args}>Cancel</CancelButton>,
};

export default story;
