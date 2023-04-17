/*
Fōrmulæ bitwise package. Module for expression definition & visualization.
Copyright (C) 2015-2023 Laurence R. Ugalde

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU Affero General Public License as
published by the Free Software Foundation, either version 3 of the
License, or (at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU Affero General Public License for more details.

You should have received a copy of the GNU Affero General Public License
along with this program.  If not, see <https://www.gnu.org/licenses/>.
*/

'use strict';

export class Bitwise extends Formulae.Package {}

Bitwise.setExpressions = function(module) {
	Formulae.setExpression(module, "Bitwise.Not", {
		clazz:      Expression.PrefixedLiteral,
		getTag:     () => "Bitwise.Not",
		getLiteral: () => Bitwise.messages.literalNot,
		getName:    () => Bitwise.messages.nameNot
	});
	
	["And", "Or", "XOr" ].forEach(tag => Formulae.setExpression(module, "Bitwise." + tag, {
		clazz:       Expression.Infix,
		getTag:      () => "Bitwise." + tag,
		getOperator: () => Bitwise.messages["operator" + tag],
		getName:     () => Bitwise.messages["name" + tag],
		min: -2
	}));
	
	["LeftShift", "RightShift" ].forEach(tag => Formulae.setExpression(module, "Bitwise." + tag, {
		clazz:       Expression.Infix,
		getTag:      () => "Bitwise." + tag,
		getOperator: () => Bitwise.messages["operator" + tag],
		getName:     () => Bitwise.messages["name" + tag],
		min: 2, max: 2
	}));
	
	["SetBit", "ClearBit", "FlipBit", "GetBit", "TestBit" ].forEach(tag => Formulae.setExpression(module, "Bitwise." + tag, {
		clazz:        Expression.Function,
		getTag:       () => "Bitwise." + tag,
		getMnemonic:  () => Bitwise.messages["mnemonic" + tag],
		getName:      () => Bitwise.messages["name" + tag],
		getChildName: index => Bitwise.messages.childrenFunctions[index],
		min: 2, max: 2
	}));
	
	["BitLength", "BitCount" ].forEach(tag => Formulae.setExpression(module, "Bitwise." + tag, {
		clazz:       Expression.Function,
		getTag:      () => "Bitwise." + tag,
		getMnemonic: () => Bitwise.messages["mnemonic" + tag],
		getName:     () => Bitwise.messages["name" + tag]
	}));
};
