import React, { useEffect, useState } from 'react';
import AssetReturnList from '../components/AssetReturnList';
import { AssetReturn } from '../types/types';

const ApiUrl=process.env.REACT_APP_API_URL;
const AssetReturns: React.FC = () => {
  const [assetReturns, setAssetReturns] = useState<AssetReturn[]>([]);

  useEffect(() => {
    fetchAssetReturns();
  }, []);

  const fetchAssetReturns = async () => {
    const response = await fetch(`${ApiUrl}/api/offboarding/asset-returns`);
    const data = await response.json();
    setAssetReturns(data);
  };

  return (
    <div className="asset-returns">
      <h1>Asset Returns</h1>
      <AssetReturnList assetReturns={assetReturns} onUpdate={fetchAssetReturns} />
    </div>
  );
};

export default AssetReturns;