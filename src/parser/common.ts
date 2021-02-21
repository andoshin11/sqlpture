import { Trim, IntegerStrings } from '../Utils'
import {
  StringLiteral,
  Expression,
  LogicalExpression,
  LogicalOperator,
  BinaryExpression,
  NullLiteral,
  BooleanLiteral,
  NumericLiteral,
  Identifier,
  MemberExpression,
  BinaryOperator,
  TableSpecifier,
  FieldSpecifier
} from '../AST'

export type ParseStatementTerminator<T> = Trim<T> extends ''
  ? {}
  : Trim<T> extends ';'
    ? {}
    : {};

export type ParseTableSpecifier<T> =
  T extends `${infer Source} AS ${infer Alias}` ? TableSpecifier<Identifier<Source>, Identifier<Alias>> :
  T extends `${infer Source} ${infer Alias}` ? TableSpecifier<Identifier<Source>, Identifier<Alias>> :
  T extends string ? TableSpecifier<Identifier<Trim<T>>> :
  never;

export type ParseIdentifier<T> =
  T extends '' ? never :
  Tokenize<T> extends [infer Head, infer Tail] ? 
    Head extends '' ? never :
    Head extends 'null' ? [NullLiteral, Tail] : 
    Head extends 'true' ? [BooleanLiteral<true>, Tail] : 
    Head extends 'false' ? [BooleanLiteral<false>, Tail] : 
    Head extends keyof IntegerStrings ? [NumericLiteral<IntegerStrings[Head] & number>, Tail] :
    [Identifier<Head & string>, Tail] :
    [Identifier<T & string>, ''];
  
type ParseMemberExpression<T> =
  Tokenize<T> extends [`${infer O}.${infer P}`, infer Tail] ?
    [MemberExpression<O, P>, Tail]
    : ParseIdentifier<T>;

export type ParseStringLiteral<T> =
  T extends `"${infer Value}"${infer Rest}` ? [StringLiteral<Value>, Rest] : 
  T extends `'${infer Value}'${infer Rest}` ? [StringLiteral<Value>, Rest] : 
  ParseMemberExpression<T>;
  
  
export type ParseCallExpression<T> = 
  Trim<T> extends '' ? never :
  ParseStringLiteral<Trim<T>> | ParseParenthesizedExpression<T>;

export type ParseBinaryExpression<T> =
    ParseCallExpression<T> extends [infer Left, infer R1] ?
      Left extends Expression ?
        Tokenize<R1> extends [infer Op, infer R2] ?
          Op extends BinaryOperator ? 
            ParseCallExpression<R2> extends [infer Right, infer R3] ?
              Right extends Expression ?
                [BinaryExpression<Left, Op, Right>, R3] :
                never :
              never :
            [Left, R1] :
          [Left, R1] :
        never :
      never;

export type ParseLogicalExpression<T> =
    ParseBinaryExpression<T> extends [infer Left, infer R1] ?
      Tokenize<R1> extends [infer Op, infer R2] ?
        Op extends LogicalOperator ? 
          ParseExpression<R2> extends [infer Right, infer R3] ?
            Left extends Expression ?
              Right extends Expression ?
                [LogicalExpression<Left, Op, Right>, R3] : 
                never :
              never :
            never :
          [Left, R1] :
        [Left, R1] :
      never;

export type ParseExpression<T> = Trim<T> extends ''
  ? never
  : ParseLogicalExpression<Trim<T>> | ParseParenthesizedExpression<T>;

export type ParseParenthesizedExpression<T> = T extends `(${infer Content})${infer Rest}` ? [ParseExpression<Content>, Rest] : never;

export type ParseFieldSpecifierList<T> = 
  T extends `${infer Head},${infer Tail}` ? [ParseFieldSpecifier<Trim<Head>>, ...ParseFieldSpecifierList<Trim<Tail>>] : 
  T extends `${infer Head} AS ${infer Alias} ${infer Tail}` ? [FieldSpecifier<Trim<ParseMemberExpression<Head>[0]>, Trim<ParseIdentifier<Alias>[0]>>, Tail] :
  T extends `${infer Head} AS ${infer Alias}` ? [FieldSpecifier<Trim<ParseMemberExpression<Head>[0]>, Trim<ParseIdentifier<Alias>[0]>>] :
  T extends `${infer Head} ${infer Alias}` ? [FieldSpecifier<Trim<ParseMemberExpression<Head>[0]>, Trim<ParseIdentifier<Alias>[0]>>] :
  [ParseFieldSpecifier<Trim<T>>];

export type ParseFieldSpecifier<T> =
  T extends `${infer Field} AS ${infer Alias}` ? FieldSpecifier<ParseMemberExpression<Trim<Field>>[0], ParseIdentifier<Trim<Alias>>[0]> :
  ParseMemberExpression<T> extends [infer M, ''] ? 
    M extends MemberExpression<infer O, infer P> ? FieldSpecifier<M, Identifier<P>> : M extends Identifier ? FieldSpecifier<M, M> :
  T extends string ? FieldSpecifier<Identifier<T>, Identifier<T>> : never :
  never;

export type Tokenize<T> =
  Trim<T> extends `${infer Head} ${infer Tail}` ? [Head, Tail] :
  Trim<T> extends `${infer Head},${infer Tail}` ? [Head, Tail] :
  Trim<T> extends `${infer Head}(${infer Tail}` ? [Head, Tail] :
  Trim<T> extends `${infer Head})${infer Tail}` ? [Head, Tail] :
  Trim<T> extends `${infer Head};${infer Tail}` ? [Head, Tail] :
  Trim<T> extends `${infer Head})` ? [Head, ')'] :
  Trim<T> extends `${infer Head};` ? [Head, ';'] :
  [Trim<T>, ''];
