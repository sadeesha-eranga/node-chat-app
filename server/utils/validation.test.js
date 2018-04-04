const expect = require('expect');
const {isRealString} = require('./validation');

describe('isReadString', () => {
    it('should reject non-string values', () => {
        let result = isRealString(10);
        expect(result).toBe(false);
    });
    it('should reject string with only spaces', () => {
        let result = isRealString('  ');
        expect(result).toBe(false);
    });
    it('should allow string with non space characters', () => {
        let result = isRealString('ABC');
        expect(result).toBe(true);
    });
});