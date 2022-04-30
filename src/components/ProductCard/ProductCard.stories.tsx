import { ComponentMeta, ComponentStory } from '@storybook/react';
import ProductCard from './ProductCard';

export default {
  title: 'ProductCard',
  component: ProductCard,
  parameters: {
    backgrounds: {
      default: 'dark'
    }
  },
  args: {
    id: 1,
    title: 'Tênis de Caminhada Leve Confortável',
    price: 179.9,
    image: 'https://rocketseat-cdn.s3-sa-east-1.amazonaws.com/modulo-redux/tenis1.jpg'
  },
  argTypes: {
    id: {
      type: 'symbol'
    }
  }
} as ComponentMeta<typeof ProductCard>;

export const Basic: ComponentStory<typeof ProductCard> = (args) => <ProductCard {...args} />;
