const regex = /[!•"#$%&'’*+,./:;=?@^`|~]/g;
const splitRegex = /[.*[({\-_><\].*[({\-_><\]?=.*?[)}\-_><\].*?[)}\-_><\]|[({\-_><\]?<=.*?[({\-_><\].*?[)}\-_><\].*[)}\-_><\].*]/g;
const filterArr = ['a', 'an', 'the', 'is', 'are', 'and', 'in', 'on', 'if', 'of'];
export { regex, splitRegex, filterArr };
