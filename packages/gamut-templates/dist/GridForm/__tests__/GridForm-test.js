import _regeneratorRuntime from "@babel/runtime/regenerator";

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

import { mount } from 'enzyme';
import React from 'react';
import { act } from 'react-dom/test-utils';
import { createPromise } from '../../utils/createPromise';
import GridForm from '..';
import { stubSelectField, stubTextField } from './stubs';
describe('GridForm', function () {
  it('submits the form when all inputs are filled out',
  /*#__PURE__*/
  _asyncToGenerator(
  /*#__PURE__*/
  _regeneratorRuntime.mark(function _callee3() {
    var _expect$toEqual;

    var fields, api, onSubmit, selectValue, textValue, wrapped, result;
    return _regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            fields = [stubSelectField, stubTextField];
            api = createPromise();

            onSubmit =
            /*#__PURE__*/
            function () {
              var _ref2 = _asyncToGenerator(
              /*#__PURE__*/
              _regeneratorRuntime.mark(function _callee(values) {
                return _regeneratorRuntime.wrap(function _callee$(_context) {
                  while (1) {
                    switch (_context.prev = _context.next) {
                      case 0:
                        return _context.abrupt("return", api.resolve(values));

                      case 1:
                      case "end":
                        return _context.stop();
                    }
                  }
                }, _callee);
              }));

              return function onSubmit(_x) {
                return _ref2.apply(this, arguments);
              };
            }();

            selectValue = stubSelectField.options[1];
            textValue = 'Hooray!';
            wrapped = mount(React.createElement(GridForm, {
              fields: fields,
              onSubmit: onSubmit,
              submit: {
                contents: React.createElement(React.Fragment, null, "Submit")
              }
            }));
            wrapped.find('select').simulate('change', {
              target: {
                value: selectValue
              }
            });
            wrapped.find('input[type="text"]').simulate('change', {
              target: {
                value: textValue
              }
            });
            wrapped.setProps(wrapped.props());
            _context3.next = 11;
            return act(
            /*#__PURE__*/
            _asyncToGenerator(
            /*#__PURE__*/
            _regeneratorRuntime.mark(function _callee2() {
              return _regeneratorRuntime.wrap(function _callee2$(_context2) {
                while (1) {
                  switch (_context2.prev = _context2.next) {
                    case 0:
                      wrapped.find('form').simulate('submit');
                      _context2.next = 3;
                      return api.innerPromise;

                    case 3:
                    case "end":
                      return _context2.stop();
                  }
                }
              }, _callee2);
            })));

          case 11:
            _context3.next = 13;
            return api.innerPromise;

          case 13:
            result = _context3.sent;
            expect(result).toEqual((_expect$toEqual = {}, _defineProperty(_expect$toEqual, stubSelectField.name, selectValue), _defineProperty(_expect$toEqual, stubTextField.name, textValue), _expect$toEqual));

          case 15:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  })));
});