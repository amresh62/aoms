import React from 'react';
import { Badge, Table } from 'react-bootstrap';
import { AssetReturn, AssetReturnStatus } from '../types/types';

interface Props {
    assetReturns: AssetReturn[];
    onUpdate: () => void;
}

const AssetReturnList: React.FC<Props> = ({ assetReturns, onUpdate }) => {
    const getStatusBadge = (status: AssetReturnStatus) => {
        switch (status) {
            case AssetReturnStatus.RETURNED:
                return <Badge bg="success">AssetReturnStatus.RETURNED</Badge>;
            case AssetReturnStatus.PENDING:
                return <Badge bg="warning">AssetReturnStatus.PENDING</Badge>;
            case AssetReturnStatus.LOST:
                return <Badge bg="danger">AssetReturnStatus.LOST</Badge>;
            default:
                return <Badge bg="secondary">{status}</Badge>;
        }
    };

    return (
        <Table striped bordered hover responsive>
            <thead>
                <tr>
                    <th>Employee Name</th>
                    <th>Asset Name</th>
                    <th>Asset ID</th>
                    <th>Status</th>
                    <th>Returned At</th>
                </tr>
            </thead>
            <tbody>
                {assetReturns.map((assetReturn) => (
                    <tr key={assetReturn.id}>
                        <td>{assetReturn.receivedBy?.firstName} {assetReturn.receivedBy?.lastName}</td>
                        <td>{assetReturn.assetName}</td>
                        <td>{assetReturn.assetId}</td>
                        <td>{getStatusBadge(assetReturn.status)}</td>
                        <td>{assetReturn.returnedAt}</td>
                    </tr>
                ))}
            </tbody>
        </Table>
    );
};

export default AssetReturnList;
