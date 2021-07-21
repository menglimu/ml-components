import merge from "@/utils/merge";
test("merge 基础测试", () => {
  expect(merge({ a: 1 }, { a: 2 })).toEqual({ a: 2 });
  expect(merge({ a: 1 })).toEqual({ a: 1 });
  expect(merge(1)).toBe(1);
  expect(merge({ a: 1, b: [1, 3], c: { a: 1 }, d: 1 }, { a: 2, b: [2], c: { b: 1 }, d: undefined })).toEqual({
    a: 2,
    b: [2],
    c: { a: 1, b: 1 },
    d: 1,
  });
});
test("merge 原始值更改", () => {
  let a = { a: 1, c: { a: 1 } };
  let b = { b: 2 };
  let c = merge(a, b);
  c.a = 23;
  c.c.a = 23;
  expect(a).toEqual({ a: 1, c: { a: 1 } });
  // expect(a).toEqual({ a: 1 });
});
test("merge function", () => {
  let a = 1;
  let b = 1;
  let data = merge(
    {
      a: function() {
        a = 2;
        return String(a);
      },
      b: 2346,
    },
    {
      a: function() {
        b = 2;
        return b;
      },
    },
  );
  expect(data.b).toBe(2346);
  expect(data.a()).toBe(2);
  expect(a).toBe(1);
  expect(b).toBe(2);
});
