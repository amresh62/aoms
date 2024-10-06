import React, { useEffect, useState } from 'react';
import { Button, Card, Form } from 'react-bootstrap';
import AssetReturnList from '../components/AssetReturnList';
import { AssetReturn, AssetReturnStatus } from '../types/types';
import { fetchWithCredentials } from '../utils/api';

const AssetReturns: React.FC = () => {
  const [assetReturns, setAssetReturns] = useState<AssetReturn[]>([]);
  const [selectedAsset, setSelectedAsset] = useState<string>('');
  const [newStatus, setNewStatus] = useState<string>('');

  useEffect(() => {
    fetchAssetReturns();
  }, []);

  const fetchAssetReturns = async () => {
    const response = await fetchWithCredentials(`/api/offboarding/asset-returns`, {
      credentials: 'include',
    });
    const data = await response.json();
    setAssetReturns(data);
  };
  

  const updateAssetStatus = async () => {
    if (!selectedAsset || !newStatus) return;

    try {
      const response = await fetchWithCredentials(`/api/offboarding/asset-return/${selectedAsset}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newStatus),
        credentials: 'include',
      });

      if (response.ok) {
        await fetchAssetReturns();
        setSelectedAsset('');
        setNewStatus('');
      } else {
        console.error('Failed to update asset status');
      }
    } catch (error) {
      console.error('Error updating asset status:', error);
    }
  };

  return (
    <Card>
      <Card.Header>
        <h2 className='text-primary'>Asset Returns</h2>
      </Card.Header>
      <Card.Body>
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>Select Asset</Form.Label>
            <Form.Control 
              as="select" 
              value={selectedAsset} 
              onChange={(e) => setSelectedAsset(e.target.value)}
            >
              <option value="">Choose an asset...</option>
              {assetReturns.map((asset) => (
                <option key={asset.id} value={asset.id}>
                  {asset.assetName}
                </option>
              ))}
            </Form.Control>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>New Status</Form.Label>
            <Form.Control 
              as="select" 
              value={newStatus} 
              onChange={(e) => setNewStatus(e.target.value)}
            >
              <option value="">Choose a status...</option>
              {Object.values(AssetReturnStatus).map((status) => (
                <option key={status} value={status}>
                  {status}
                </option>
              ))}
            </Form.Control>
          </Form.Group>
          <Button variant="primary" onClick={updateAssetStatus}>
            Update Status
          </Button>
        </Form>
        <hr />
        <AssetReturnList assetReturns={assetReturns} onUpdate={fetchAssetReturns} />
      </Card.Body>
    </Card>
  );
};

export default AssetReturns;
