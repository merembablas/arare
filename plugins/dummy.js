
/**
 * Returns a random integer between min (inclusive) and max (inclusive).
 * The value is no lower than min (or the next integer greater than min
 * if min isn't an integer) and no greater than max (or the next integer
 * lower than max if max isn't an integer).
 * Using Math.round() will give you a non-uniform distribution!
 */
function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

const RANDOM_NUM_INT_CACHE = {};
const RANDOM_NAME_CACHE = {};

function randomNumber(seed, min, max) {
    if (RANDOM_NUM_INT_CACHE[seed] != null) {
        return RANDOM_NUM_INT_CACHE[seed];
    }
    const num = getRandomInt(min, max);
    RANDOM_NUM_INT_CACHE[seed] = num;
    return RANDOM_NUM_INT_CACHE[seed];
}

const NAME_LIST = [
    "Dian Sastro",
    "Urip Raharjo",
    "Eko Prasetyo",
    "Yanto Zulkarnaen",
    "Galam Zulkifli"
]

const USER_PIC_LIST = [
    "https://images.pexels.com/photos/61100/pexels-photo-61100.jpeg?crop=faces&fit=crop&h=200&w=200&auto=compress&cs=tinysrgb",
    "https://randomuser.me/api/portraits/men/78.jpg",
    "https://randomuser.me/api/portraits/men/79.jpg",
    "https://randomuser.me/api/portraits/men/80.jpg",
    "https://randomuser.me/api/portraits/men/81.jpg",
    "https://randomuser.me/api/portraits/men/82.jpg"
]

function randomName(seed) {
    if (RANDOM_NAME_CACHE[seed] != null) {
        return RANDOM_NUM_INT_CACHE[seed];
    }
    const name = NAME_LIST[seed % NAME_LIST.length];
    NAME_LIST[seed] = name
    return name
}

function randomPic(seed) {
    return USER_PIC_LIST[seed % USER_PIC_LIST.length]
}

function generateUsers(count) {
    return Array.from(Array(count).keys()).map((i) => {
        return {
            id: i,
            name: randomName(i),
            stars: randomNumber(i, 1, 5),
            rank: randomNumber(i, 1, 10),
            collections: randomNumber(i, 1, 100),
            pic: randomPic(i)
        }
    })
}

export default ({ app }, inject) => {
    inject('dummy', {
        generateUsers,
        randomPic
    })
}