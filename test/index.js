'use strict';

let {
    parse,
    generateProductionId
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

    it('epsilon', () => {
        assert.deepEqual(parse('A := EPSILON | b c |'), {
            startSymbol: 'A',
            T: ['b', 'c'],
            N: ['A'],
            productions: [
                ['A', []],
                ['A', ['b', 'c']]
            ]
        });
    });

    it('comment', () => {
        assert.deepEqual(parse('# abcd').productions, []);
        assert.deepEqual(parse('# abcd\n# def').productions, []);
        assert.deepEqual(parse('A := a c\n# abcd\n# def'), {
            startSymbol: 'A',
            T: ['a', 'c'],
            N: ['A'],
            productions: [
                ['A', ['a', 'c']]
            ]
        });
        assert.deepEqual(parse('A := a c\n# abcd\n# def\nB := e f'), {
            startSymbol: 'A',
            T: ['a', 'c', 'e', 'f'],
            N: ['A', 'B'],
            productions: [
                ['A', ['a', 'c']],
                ['B', ['e', 'f']]
            ]
        });
    });

    it('| start line', () => {
        assert.deepEqual(parse('A := a B\n| c D\n B := b'), {
            'startSymbol': 'A',
            'T': ['a', 'c', 'D', 'b'],
            'N': ['A', 'B'],
            'productions': [
                ['A', ['a', 'B']],
                ['A', ['c', 'D']],
                ['B', ['b']]
            ]
        });
    });

    it('@ annotation', () => {
        assert.deepEqual(parse('A := a B @ a * B'), {
            'startSymbol': 'A',
            'T': ['a', 'B'],
            'N': ['A'],
            'productions': [
                ['A', ['a', 'B'], 'a * B']
            ]
        });
    });

    it('@ annotation2', () => {
        assert.deepEqual(parse('A := a B @ a * B | c @e'), {
            'startSymbol': 'A',
            'T': ['a', 'B', 'c'],
            'N': ['A'],
            'productions': [
                ['A', ['a', 'B'], 'a * B'],
                ['A', ['c'], 'e']
            ]
        });
    });

    it('@ annotation3', () => {
        assert.deepEqual(parse('A := a B @ a * B \nA := c @e'), {
            'startSymbol': 'A',
            'T': ['a', 'B', 'c'],
            'N': ['A'],
            'productions': [
                ['A', ['a', 'B'], 'a * B'],
                ['A', ['c'], 'e']
            ]
        });
    });

    it('generateProductionId', () => {
        assert.equal(generateProductionId(['A', []]), 'A := EPSILON');
        assert.equal(generateProductionId(['A', ['a']]), 'A := a');
        assert.equal(generateProductionId(['A', ['a', 'B', 'c']]), 'A := a B c');
    });
});
