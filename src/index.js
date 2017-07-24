'use strict';

const DELIMITER = ':=',
    OR_DELIMITER = '|',
    EPSILON = 'EPSILON',
    ANNOTATE = '@',
    COMMENT_PREFIX = '#';

let parse = (str) => {
    let productions = [];
    let lines = str.split('\n');

    for (let i = 0; i < lines.length; i++) {
        let line = lines[i];
        line = line.trim();
        if (line) {
            productions = productions.concat(parseLine(line, i, productions.length ? productions[productions.length - 1][0] : null));
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

let parseLine = (line, lineNumber, prevHead) => {
    line = line.trim();

    // comment line
    if (line[0] === COMMENT_PREFIX) {
        return [];
    } else if (line[0] === OR_DELIMITER) {
        let rest = line.substring(1);
        if (!prevHead) {
            throw new Error(`head is a empty string.\n${pointLine(line, lineNumber)}`);
        }
        return parseRest(rest, prevHead);
    } else {
        // split head and body
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

        return parseRest(rest, head);
    }
};

let parseRest = (rest, head) => {
    let productions = [];

    let restSentences = rest.split(OR_DELIMITER);

    for (let i = 0; i < restSentences.length; i++) {
        let restSentence = restSentences[i].trim();
        if (restSentence) {
            let [bodySentence, annotation] = restSentence.split(ANNOTATE);
            bodySentence = (bodySentence || '').trim();
            annotation = (annotation || '').trim();
            let body = getBody(bodySentence);
            if (!annotation) {
                productions.push([head, body]);
            } else {
                productions.push([head, body, annotation]);
            }
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

let generateProductionId = ([head, body]) => {
    let bodyStr = body.join(' ');
    if (!body.length) {
        bodyStr = 'EPSILON';
    }
    return `${head} := ${bodyStr}`;
};

module.exports = {
    parse,
    EPSILON,
    generateProductionId
};
