
import OrderModel from "../order.model";


const orderModel = new OrderModel();


describe('Order Model', () => {
    describe('test the Order Models that is exists', () => {
        it('should have a show all Orders model', () => {
            expect(orderModel.showall).toBeDefined();
        });

        it('should have a create new order model', () => {
            expect(orderModel.create).toBeDefined();
        });

        it('should have a show one order model', () => {
            expect(orderModel.showone).toBeDefined();
        });

        it('should have an update one order model', () => {
            expect(orderModel.updateone).toBeDefined();
        });

        it('should have a delete one order model', () => {
            expect(orderModel.deleteone).toBeDefined();
        });
    });


});