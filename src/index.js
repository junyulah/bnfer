'use strict';

const DELIMITER = ':=';

const OR_DELIMITER = '|';

const EPSILON = 'EPSILON';

const COMMENT_PREFIX = '#';

let parse = (str) => {
    let productions = [];
    let lines = str.split('\n');

    for (let i = 0; i < lines.length; i++) {
        let line = lines[i];
        line = line.trim();
        if (line) {
            productions = productions.concat(parseLine(line, i));
        }
    }

    return toCtxGrammer(productions);
};

let toCtxGrammer = (productions) => {
    let N = [],
        T = [],
        startSymbol = null;
    let noneTerminalMap = {},
        terminalMap = {};

    for (let i = 0; i < productions.length; i++) {
        let head = productions[i][0];
        if (!noneTerminalMap[head]) {
            N.push(head);
            noneTerminalMap[head] = 1;
        }

        if (startSymbol === null) {
            startSymbol = head;
        }
    }

    for (let i = 0; i < productions.length; i++) {
        let body = productions[i][1];
        for (let j = 0; j < body.length; j++) {
            let item = body[j];
            if (!noneTerminalMap[item] && !terminalMap[item]) {
                T.push(item);
                terminalMap[item] = 1;
            }
        }
    }

    return {
        startSymbol,
        T,
        N,
        productions
    };
};

let parseLine = (line, lineNumber) => {
    line = line.trim();
    let productions = [];

    if(line[0] === COMMENT_PREFIX)  {
        return productions;
    }

    let parts = line.split(DELIMITER);
    if (parts.length < 2) {
        throw new Error(`Fail to split line, missing delimiter :=. \n${pointLine(line, lineNumber)}`);
    }

    let head = parts[0];
    let rest = line.substring(head.length + DELIMITER.length);

    //
    head = head.trim();
    if (!head) {
        throw new Error(`head is a empty string.\n${pointLine(line, lineNumber)}`);
    }

    let restSentences = rest.split(OR_DELIMITER);

    for (let i = 0; i < restSentences.length; i++) {
        let restSentence = restSentences[i].trim();
        if (restSentence) {
            let body = getBody(restSentence);
            productions.push([head, body]);
        }
    }


    return productions;
};

let getBody = (rest) => {
    let body = [];
    if (rest === EPSILON) {
        return body;
    } else {
        let restParts = rest.split(' ');
        for (let i = 0; i < restParts.length; i++) {
            let part = restParts[i].trim();
            body.push(part);
        }

        return body;
    }
};

let pointLine = (line, lineNumber) => `[${lineNumber}] ${line}`;

module.exports = {
    parse,
    EPSILON
};
