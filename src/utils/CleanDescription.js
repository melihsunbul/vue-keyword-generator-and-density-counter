import { regex,splitRegex } from '../cleanupResources';

export function cleanDescription({ description }) {
    const desc = description.replace(regex, '').replace(splitRegex, ' ').trim().replaceAll('İ', 'i').toLowerCase();
    return {
        description: desc,
    };
}
