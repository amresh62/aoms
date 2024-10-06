import React from 'react';
import { AssetReturn } from '../types/types';

interface Props {
    assetReturns: AssetReturn[];
    onUpdate: (assetReturn: AssetReturn) => void;
}

const AssetReturnList: React.FC<Props> = ({ assetReturns, onUpdate }) => {
    return (
        <table>
            <thead>
                <tr>
                    <th>Asset Name</th>
                    <th>Asset ID</th>
                    <th>Status</th>
                    <th>Returned At</th>
                    <th>Received By</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {assetReturns.map((assetReturn) => (
                    <tr key={assetReturn.id}>
                        <td>{assetReturn.assetName}</td>
                        <td>{assetReturn.assetId}</td>
                        <td>{assetReturn.status}</td>
                        <td>{assetReturn.returnedAt}</td>
                        <td>{assetReturn.receivedBy?.firstName} {assetReturn.receivedBy?.lastName}</td>
                        <td>
                            <button onClick={() => onUpdate(assetReturn)}>Update</button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default AssetReturnList;