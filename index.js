module.exports = require('./src');

/**
 *
 * @readme-quick-run
 *
 * ## test tar=js r_c=bnfer
 *
 * let {parse} = bnfer;
 * let grammer = parse('EXP := num | EXP + num | EXP - num');
 * console.log(JSON.stringify(grammer, null, 4));
 */
