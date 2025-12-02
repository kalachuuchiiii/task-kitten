import { parseQuery } from "../../../utils"



describe("parse query efficiently",() => {
  test('parse query', () => {
     expect(parseQuery("status=pending")).toStrictEqual({ filter: { status: "pending" } });
  })
})