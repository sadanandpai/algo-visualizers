import { useNavigate, useParams } from 'react-router-dom';

import SingleAlgorithmLayout from '@/apps/sorting-visualizer/layouts/single-algorithm.layout';
import { menuItems } from '@/apps/sorting-visualizer/config';
import { useEffect } from 'react';

function AlgorithmPage() {
  const { algoName } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (!algoName) {
      navigate(`/sorting-visualizer/${menuItems[0]}`);
    }
  }, [algoName, navigate]);

  return <SingleAlgorithmLayout />;
}

export default AlgorithmPage;
