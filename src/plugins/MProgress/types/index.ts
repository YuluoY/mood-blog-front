export type MProgressProps = {
  height?: number | string;
  color?: string;
};

export const props = {
  height: {
    type: [Number, String],
    default: 2,
  },
  color: {
    type: String,
    default: '#2177b8',
  }
} 