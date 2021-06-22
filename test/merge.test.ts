import merge from '@/utils/merge';
test('merge 基础测试', () => {
  expect(merge({ a: 1 }, { a: 2 })).toEqual({ a: 2 });
  expect(merge({ a: 1 }, { a: 2, b: 1 }, { a: 3 })).toEqual({ a: 3, b: 1 });
  expect(merge({ a: 1, b: [1] }, { a: 2, b: [2] })).toEqual({ a: 2, b: [2] });
});
test('merge function', () => {
  let a = 1;
  let b = 1;
  let data: any = merge(
    {
      a: function () {
        a = 2;
        return a;
      }
    },
    {
      a: function () {
        b = 2;
        return b;
      }
    }
  );

  expect(data.a()).toBe(2);
  expect(a).toBe(1);
  expect(b).toBe(2);
});
