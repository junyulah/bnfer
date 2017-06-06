'use strict';

let {
    parse
} = require('..');
let assert = require('assert');

describe('index', () => {
    it('missing delimiter', (done) => {
        try {
            parse('djsdk');
        } catch (err) {
            assert(err.toString().indexOf('missing delimiter') !== -1);
            done();
        }
    });

    it('empty head', (done) => {
        try {
            parse(' :=def new');
        } catch (err) {
            assert(err.toString().indexOf('head is a empty string') !== -1);
            done();
        }
    });

    it('adjacent', () => {
        let grammer = parse('A := B c d');
        assert.deepEqual(grammer, {
            startSymbol: 'A',
            T: ['B', 'c', 'd'],
            N: ['A'],
            productions: [
                ['A', ['B', 'c', 'd']]
            ]
        });
    });

    it('multi lines', () => {
        let grammer = parse('A := B c d\nB:= e f');
        assert.deepEqual(grammer, {
            startSymbol: 'A',
            T: ['c', 'd', 'e', 'f'],
            N: ['A', 'B'],
            productions: [
                ['A', ['B', 'c', 'd']],
                ['B', ['e', 'f']]
            ]
        });
    });

    it('or', () => {
        let grammmer = parse('A := B c d | K e f');
        assert.deepEqual(grammmer, {
            startSymbol: 'A',
            T: ['B', 'c', 'd', 'K', 'e', 'f'],
            N: ['A'],
            productions: [
                ['A', ['B', 'c', 'd']],
                ['A', ['K', 'e', 'f']]
            ]
        });
    });

    it('or lines', () => {
        assert.deepEqual(parse('A := B c d \n B:=D var | K D \n \n K:=num'), {
            startSymbol: 'A',
            T: ['c', 'd', 'D', 'var', 'num'],
            N: ['A', 'B', 'K'],
            productions: [
                ['A', ['B', 'c', 'd']],
                ['B', ['D', 'var']],
                ['B', ['K', 'D']],
                ['K', ['num']]
            ]
        });
    });
});
