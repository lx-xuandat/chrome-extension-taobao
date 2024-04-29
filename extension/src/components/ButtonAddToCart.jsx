import React from 'react';
import { Button } from 'antd';
import { CartListener as Listener } from '../EventListener';

export const ButtonAddToCart = () => {
    return (
        <Button type="primary" onClick={Listener.addToCart}>
            加采购车 - Thêm vào giỏ hàng
        </Button>
    );
}
