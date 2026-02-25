import React, { useEffect, useState } from "react";
import axios from "axios";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Button } from "../ui/button";
import { Dialog } from "../ui/dialog";
import ShoppingOrderdetailsView from "./orderdetails";
import { useSelector } from "react-redux";

export default function ShoppingOrders() {
  const { user } = useSelector((state) => state.auth);
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [openDetailsDialog, setOpenDetailsDialog] = useState(false);

  useEffect(() => {
    const fetchOrders = async () => {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/shop/order/user/${user.id}`,
      );

      if (response.data.success) {
        setOrders(response.data.data);
      }
    };

    fetchOrders();
  }, [user.id]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>My Orders</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Order ID</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Total</TableHead>
              <TableHead>Status</TableHead>
              <TableHead></TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {orders.length > 0 ? (
              orders.map((order) => (
                <TableRow key={order._id}>
                  <TableCell>{order._id.slice(-8)}</TableCell>
                  <TableCell>
                    {new Date(order.orderDate).toLocaleDateString()}
                  </TableCell>
                  <TableCell>₦{order.totalAmount.toLocaleString()}</TableCell>
                  <TableCell>{order.orderStatus}</TableCell>
                  <TableCell>
                    <Dialog
                      open={openDetailsDialog}
                      onOpenChange={setOpenDetailsDialog}
                    >
                      <Button
                        onClick={() => {
                          setSelectedOrder(order);
                          setOpenDetailsDialog(true);
                        }}
                      >
                        View
                      </Button>

                      {selectedOrder && (
                        <ShoppingOrderdetailsView order={selectedOrder} />
                      )}
                    </Dialog>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan="5" className="text-center">
                  No orders found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
