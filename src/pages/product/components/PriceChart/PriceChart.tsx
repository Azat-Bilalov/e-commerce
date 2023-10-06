import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { ProductModel } from '@/store/models/products';
import MultiDropdown, { Option } from '@/components/MultiDropdown';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top' as const,
    },
    title: {
      display: true,
      text: 'Price Chart',
    },
  },
};

const dateOptions = [
  {
    key: 'month',
    value: 'Month',
  },
  {
    key: 'year',
    value: 'Year',
  },
  {
    key: '5 years',
    value: '5 Years',
  },
];

const getDates = (sample: Option, product: ProductModel) => {
  const { key } = sample;

  const dateFilter = (date: string) => {
    const dateObj = new Date(date);
    if (key === 'month') {
      const dateNow = new Date();
      dateNow.setDate(dateNow.getDate() - 30);
      return dateObj >= dateNow;
    }
    if (key === 'year') {
      const dateYear = new Date();
      dateYear.setDate(dateYear.getDate() - 365);
      const dateMonth = new Date();
      dateMonth.setDate(dateMonth.getDate() - 30);
      return dateObj >= dateYear && dateObj < dateMonth;
    }
    if (key === '5 years') {
      const dateYear = new Date();
      dateYear.setDate(dateYear.getDate() - 365);
      const date5Year = new Date();
      date5Year.setDate(date5Year.getDate() - 365 * 5);
      return dateObj >= date5Year && dateObj <= dateYear;
    }
    return true;
  };

  return product.priceHistory.order.filter(dateFilter).reverse();
};

const getLabels = (sample: Option, dates: string[]) => {
  const { key } = sample;

  if (key === 'month') {
    return dates.map((date) =>
      new Date(date).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
      }),
    );
  }
  if (key === 'year') {
    return dates.map((date) =>
      new Date(date).toLocaleDateString('en-US', { month: 'short' }),
    );
  }
  if (key === '5 years') {
    return dates.map((date) =>
      new Date(date).toLocaleDateString('en-US', { year: 'numeric' }),
    );
  }
};

export type PriceChartProps = {
  className?: string;
  product: ProductModel;
};

const PriceChart: React.FC<PriceChartProps> = ({ className, product }) => {
  const [sample, setSample] = React.useState<Option>(dateOptions[0]);

  const handleLabelChange = React.useCallback((values: Option[]) => {
    if (values.length === 0) return;
    setSample(values[0]);
  }, []);

  const getTitle = React.useCallback(() => sample.value, [sample]);

  const data = React.useMemo(() => {
    const dates = getDates(sample, product);

    return {
      labels: getLabels(sample, dates),
      datasets: [
        {
          label: `Price by ${sample.value}`,
          data: dates.map((date) => {
            const price = product.priceHistory.entities[date].price;
            const discount = product.priceHistory.entities[date]?.discount;
            return discount ? price * (1 - discount) : price;
          }),
          borderColor: 'rgb(255, 99, 132)',
          backgroundColor: 'rgba(255, 99, 132, 0.5)',
        },
      ],
    };
  }, [sample, product]);

  return (
    <>
      <MultiDropdown
        options={dateOptions}
        value={[sample]}
        onChange={handleLabelChange}
        getTitle={getTitle}
        maxSelected={1}
      />
      <Line options={options} data={data} />
    </>
  );
};

export default PriceChart;
