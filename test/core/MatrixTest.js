import test from 'ava'
import path from 'path'

import { Matrix } from '../../dist/index.js'

test('rows should have the same number of rows as passed into the constructor', t => {
  const matrix = new Matrix(2, 3)
  t.is(matrix.rows, 2)
})

test('columns should have the same number of columns as passed into the constructor', t => {
  const matrix = new Matrix(2, 3)
  t.is(matrix.columns, 3)
})

test('data should have the same number of columns as passed into the constructor', t => {
  const matrix = new Matrix(2, 3)
  t.is(matrix.columns, 3)
})

test('setIdentity() should set the matrix to the identity', t => {
  const matrix = new Matrix(2, 2)
  matrix.setIdentity()
  t.is(matrix.data[0], 1.0)
  t.is(matrix.data[1], 0.0)
  t.is(matrix.data[2], 0.0)
  t.is(matrix.data[3], 1.0)
})

test('setElement() should set elements of the matrix', t => {
  const matrix = new Matrix(2, 2)
  matrix.setIdentity()
  matrix.setElement(0, 0, 2.0)
  matrix.setElement(0, 1, 3.0)
  matrix.setElement(1, 0, 4.0)
  matrix.setElement(1, 1, 5.0)
  t.is(matrix.data[0], 2.0)
  t.is(matrix.data[1], 3.0)
  t.is(matrix.data[2], 4.0)
  t.is(matrix.data[3], 5.0)
})

test('getElement() should get elements of the matrix', t => {
  const matrix = new Matrix(2, 2)
  matrix.setElement(0, 0, 2.0)
  matrix.setElement(0, 1, 3.0)
  matrix.setElement(1, 0, 4.0)
  matrix.setElement(1, 1, 5.0)
  t.is(matrix.getElement(0, 0), 2.0)
  t.is(matrix.getElement(0, 1), 3.0)
  t.is(matrix.getElement(1, 0), 4.0)
  t.is(matrix.getElement(1, 1), 5.0)
})

test('passing a Matrix to the constructor should create a copy', t => {
  const matrix = new Matrix(2, 2)
  matrix.setElement(0, 0, 2.0)
  matrix.setElement(0, 1, 3.0)
  matrix.setElement(1, 0, 4.0)
  matrix.setElement(1, 1, 5.0)
  const matrixCopy = new Matrix(matrix)
  t.is(matrixCopy.getElement(0, 0), 2.0)
  t.is(matrixCopy.getElement(0, 1), 3.0)
  t.is(matrixCopy.getElement(1, 0), 4.0)
  t.is(matrixCopy.getElement(1, 1), 5.0)
})
