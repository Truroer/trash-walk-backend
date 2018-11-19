let Events = require ('../../controllers/event.controller');
const chai = require ('chai');
const expect = require ('chai').expect
const should = chai.should();
const sinon = require ('sinon')

describe('events',  function() {
    const ctx = { 
        method: 'POST',
        request: { body: { userId: "fc792790-86e5-444c-ae3b-88690d765cbd" } } }

    describe('create event', function() {

        it('should return an object', async function() {
            sinon.spy(Events, "createEvent");
            await Events.createEvent(ctx);
            ctx.body.should.be.an('object');
        })

        it('should have property active',  function() {
            ctx.body.should.have.property('active');
        })

        it('should have property active',  function() {
            ctx.body.should.have.property('active');
        })

        it('should call the middleware on wrong request method',  async function() {
            const ctx = {method: 'GET'}
            const spy = sinon.spy();
            await Events.createEvent(ctx, spy);
            spy.calledOnce.should.be.true;
        })

        it('should have status of type number', async function() {
            await Events.createEvent(ctx);
            console.log(ctx.status);
            ctx.status.should.be.a('number');
        })


    })


})
