/*
Fōrmulæ bitwise package. Module for reduction.
Copyright (C) 2015-2025 Laurence R. Ugalde

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

Bitwise.binary = async (binary, session) => {
	let result;
	let bi;
	let tag = binary.getTag();
	let integer;
	
	for (let i = 0, n = binary.children.length; i < n; ++i) {
		integer = CanonicalArithmetic.getInteger(binary.children[i]);
		if (integer === undefined) {
			ReductionManager.setInError(binary.children[i], "Expression must be an integer number");
			throw new ReductionError();
		}
		
		if (i == 0) {
			result = integer;
		}
		else {
			switch (tag) {
				case "Bitwise.And":
					result = result.bitwiseAnd(integer);
					break;
				case "Bitwise.Or":
					result = result.bitwiseOr(integer);
					break;
				case "Bitwise.XOr":
					result = result.bitwiseXOr(integer);
					break;
				case "Bitwise.LeftShift":
					result = result.bitwiseLeftShift(integer);
					break;
				case "Bitwise.RightShift":
					result = result.bitwiseRightShift(integer);
					break;
				case "Bitwise.SetBit":
					result = result.bitwiseSetBit(integer);
					break;
				case "Bitwise.ClearBit":
					result = result.bitwiseClearBit(integer);
					break;
				case "Bitwise.FlipBit":
					resulr = result.bitwiseFlipBit(integer);
					break;
				case "Bitwise.GetBit":
					result = result.bitwiseGetBit(integer);
					break;
				case "Bitwise.TestBit":
					binary.replaceBy(
						Formulae.createExpression(
							result.bitwiseGetBit(integer).isZero() ? "Logic.False" : "Logic.True"
						)
					);
					return true;
			}
		}
	}
	
	binary.replaceBy(
		CanonicalArithmetic.createInternalNumber(result, session)
	);
	return true;
};

Bitwise.unary = async (unary, session) => {
	let n = CanonicalArithmetic.getInteger(unary.children[0]);
	if (n === undefined) {
		ReductionManager.setInError(unary.children[0], "Expression must be an integer number");
		throw new ReductionError();
	}

	let result;
	switch (unary.getTag()) {
		case "Bitwise.Not":
			result = n.bitwiseNot();
			break;
		case "Bitwise.BitLength":
			result = n.bitwiseBitLength();
			break;
		case "Bitwise.BitCount":
			result = n.bitwiseBitCount();
			break;
	}
	
	unary.replaceBy(
		CanonicalArithmetic.createInternalNumber(result, session)
	);
	return true;
};

Bitwise.setReducers = () => {
	ReductionManager.addReducer("Bitwise.And",        Bitwise.binary, "Bitwise.binary");
	ReductionManager.addReducer("Bitwise.Or",         Bitwise.binary, "Bitwise.binary");
	ReductionManager.addReducer("Bitwise.XOr",        Bitwise.binary, "Bitwise.binary");
	ReductionManager.addReducer("Bitwise.LeftShift",  Bitwise.binary, "Bitwise.binary");
	ReductionManager.addReducer("Bitwise.RightShift", Bitwise.binary, "Bitwise.binary");
	ReductionManager.addReducer("Bitwise.SetBit",     Bitwise.binary, "Bitwise.binary");
	ReductionManager.addReducer("Bitwise.ClearBit",   Bitwise.binary, "Bitwise.binary");
	ReductionManager.addReducer("Bitwise.FlipBit",    Bitwise.binary, "Bitwise.binary");
	ReductionManager.addReducer("Bitwise.GetBit",     Bitwise.binary, "Bitwise.binary");
	ReductionManager.addReducer("Bitwise.TestBit",    Bitwise.binary, "Bitwise.binary");

	ReductionManager.addReducer("Bitwise.Not",       Bitwise.unary, "Bitwise.unary");
	ReductionManager.addReducer("Bitwise.BitLength", Bitwise.unary, "Bitwise.unary");
	ReductionManager.addReducer("Bitwise.BitCount",  Bitwise.unary, "Bitwise.unary");
};
