
import OrderListsModel from "../orderlists.model";


const orderlistModel = new OrderListsModel();


describe('OrderList Model', () => {
    describe('test the OrderList Models that is exists', () => {
        it('should have a show all Orderlists model', () => {
            expect(orderlistModel.showall).toBeDefined();
        });

        it('should have a create new orderLists model', () => {
            expect(orderlistModel.create).toBeDefined();
        });

        it('should have a show one orderlists model', () => {
            expect(orderlistModel.showone).toBeDefined();
        });

        it('should have an update one ordeLists model', () => {
            expect(orderlistModel.updateone).toBeDefined();
        });

        it('should have a delete one orderLists model', () => {
            expect(orderlistModel.deleteone).toBeDefined();
        });

        it('should have Get ALL orders model', () => {
            expect(orderlistModel.getAllOrders).toBeDefined();
        });
    });


});