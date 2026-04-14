import { Chart, Plugin } from 'chart.js';

export type BarChartZeroLinePluginProps = {
  lineColor?: string;
};

export type BarChartZeroLinePlugin = (props: BarChartZeroLinePluginProps) => Plugin<'bar'>;

export const BarChartZeroLinePlugin: BarChartZeroLinePlugin = ({ lineColor = '#969696' }) => ({
  id: 'BarChartZeroLine',
  beforeDraw: (chart: Chart) => {
    const { ctx, scales } = chart;

    const yZero = scales.y.getPixelForValue(0);

    ctx.save();
    ctx.beginPath();
    ctx.moveTo(scales.x.left, yZero);
    ctx.lineTo(scales.x.right, yZero);
    ctx.lineWidth = 1;
    ctx.strokeStyle = lineColor;
    ctx.stroke();
    ctx.restore();
  },
});
