import {expect} from "chai"; // Working with Chai expect: auto-testing
import {store, addFavorite, removeFavorite} from "../src/shared-state.js";

var item = {id: 1, title: "testing item"};

describe("redux store", function() {

    it("should initialize with a default state", function() {
        var state = store.getState();
        expect(state.favorites).to.be.instanceOf(Array); // .to and .be are unnecessary
        expect(state.favorites.length).to.equal(0);
    });

    it("should add a favorite", function() {
        var state1 = store.getState();
        store.dispatch(addFavorite(item));
        var state2 = store.getState();

        expect(state2.favorites.length).equal(1);
        expect(state2.favorites[0]).deep.equal(item); // deep equal makes sure properties are all the same, not that the objects are the same
        expect(state1).not.equal(state2);
    });

    it("should remove a favorite", function() {
        store.dispatch(removeFavorite(item.id));
        var state = store.getState();
        expect(state.favorites.length).equal(0);
    });

    it("should ignore an unknown action", function() {
        var state1 = store.getState();
        store.dispatch({type: "invalid action type"});
        var state2 = store.getState();
        expect(state1).equal(state2);
    });
});