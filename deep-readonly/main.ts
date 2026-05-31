type DeepReadonly<T> =
    T extends Function
        ? T
        : T extends object
            ? {
                readonly [K in keyof T]: DeepReadonly<T[K]>;
            }
            : T;

type User = {
    id: number;
    name: string;
    tags: string[];
    profile: {
        age: number;
        address: {
            city: string;
            zip: number;
        };
    };
    sayHi: () => void;
};

type ReadonlyUser = DeepReadonly<User>;

const user: ReadonlyUser = {
    id: 1,
    name: 'Tom',
    tags: ['A', 'B'],
    profile: {
        age: 18,
        address: {
            city: 'Taipei',
            zip: 100,
        },
    },
    sayHi() {
        console.log('hi');
    },
};

// =======================
// ✅ 正常讀取
// =======================

console.log('✅ read name', user.name);
console.log('✅ read city', user.profile.address.city);

user.sayHi();
console.log('✅ function call');

// =======================
// ✅ readonly 第一層
// =======================

// @ts-expect-error
user.name = 'Jerry';

console.log('✅ readonly level1');

// =======================
// ✅ readonly 第二層
// =======================

// @ts-expect-error
user.profile.age = 20;

console.log('✅ readonly level2');

// =======================
// ✅ readonly 第三層
// =======================

// @ts-expect-error
user.profile.address.city = 'Kaohsiung';

console.log('✅ readonly level3');

// =======================
// ✅ readonly array
// =======================

// @ts-expect-error
user.tags.push('C');

console.log('✅ readonly array');

// =======================
// ✅ readonly object replace
// =======================

// @ts-expect-error
user.profile = {
    age: 30,
    address: {
        city: 'Tokyo',
        zip: 200,
    },
};

console.log('✅ readonly object');

// =======================
// ✅ 類型推斷
// =======================

const city: string = user.profile.address.city;

console.log('✅ type infer');

// =======================
// ✅ 所有測試通過
// =======================

console.log('🎉 DeepReadonly Passed');
