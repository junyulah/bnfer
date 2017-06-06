'use strict';

let {
    parse
} = require('../');

let assert = require('assert');

describe('math', () => {
    it('base', () => {
        assert.deepEqual((parse('EXP := num | EXP + num')), {
            'startSymbol': 'EXP',
            'T': ['num', '+'],
            'N': ['EXP'],
            'productions': [
                ['EXP', ['num']],
                ['EXP', ['EXP', '+', 'num']]
            ]
        });
    });

    it('+-', () => {
        assert.deepEqual((parse('EXP := num | EXP + num | EXP - num')), {
            'startSymbol': 'EXP',
            'T': ['num', '+', '-'],
            'N': ['EXP'],
            'productions': [
                ['EXP', ['num']],
                ['EXP', ['EXP', '+', 'num']],
                ['EXP', ['EXP', '-', 'num']]
            ]
        });
    });
});
