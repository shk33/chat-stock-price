const { isMessageStockCommand, getStockIdFromMessage } = require('../services/message');
const expect = require("chai").expect;

describe("Messager Service", function() {
    describe("isMessageStockCommand", function() {
        it("it recognizes a message as a stock command when the string starts with /stock=", function() {
            const message = '/stock=aapl.us';
            const result = isMessageStockCommand(message)
            expect(result).to.be.true;
        });

        it("it returns false when message does not start with /stock=", function() {
            const message = 'hello world, this is a new message';
            const result = isMessageStockCommand(message)
            expect(result).to.be.false;
        });
    });

    describe("getStockIdFromMessage", function() {
        it("it returns the stock id from a stock command", function() {
            const message = '/stock=aapl.us';
            const result = getStockIdFromMessage(message)
            expect(result).to.equal('aapl.us');
        });

        it("it returns an empty string when there is no stock id on the stock command", function() {
            const message = '/stock=';
            const result = getStockIdFromMessage(message)
            expect(result).to.equal('');
        });

        it("it returns an empty string when there the message it is not a sotck command", function() {
            const message = 'hello world';
            const result = getStockIdFromMessage(message)
            expect(result).to.equal('');
        });
    });
});