/*
Fōrmulæ bitwise package. Module for reduction.
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

Bitwise.binary = async (binary, session) => {
	let result;
	let bi;
	let tag = binary.getTag();
	
	for (let i = 0, n = binary.children.length; i < n; ++i) {
		bi = CanonicalArithmetic.getBigInt(binary.children[i]);
		if (bi === undefined) {
			ReductionManager.setInError(binary.children[i], "Expression must be an integer number");
			throw new ReductionError();
		}
		
		if (i == 0) {
			result = bi;
		}
		else {
			switch (tag) {
				case "Bitwise.And":
					result &= bi;
					break;
				case "Bitwise.Or":
					result |= bi;
					break;
				case "Bitwise.XOr":
					result ^= bi;
					break;
				case "Bitwise.LeftShift":
					result <<= bi;
					break;
				case "Bitwise.RightShift":
					result >>= bi;
					break;
				case "Bitwise.SetBit":
					result = result | (1n << bi);
					break;
				case "Bitwise.ClearBit":
					result = result & ~(1n << bi);
					break;
				case "Bitwise.FlipBit":
					resulr = result ^ (1n << bi);
					break;
				case "Bitwise.GetBit":
					result = (result & (1n << bi)) != 0n ? 1n : 0n;
					break;
				case "Bitwise.TestBit":
					result = (result & (1n << bi)) != 0n ? "Logic.True" : "Logic.False";
					break;
			}
		}
	}
	
	if (tag === "Bitwise.TestBit") {
		binary.replaceBy(Formulae.createExpression(result));
	}
	else {
		binary.replaceBy(
			CanonicalArithmetic.canonical2InternalNumber(
				new CanonicalArithmetic.Integer(result)
			)
		);
	}
	return true;
};

Bitwise.unary = async (unary, session) => {
	let bi = CanonicalArithmetic.getBigInt(unary.children[0]);
	if (bi === undefined) {
		ReductionManager.setInError(unary.children[0], "Expression must be an integer number");
		throw new ReductionError();
	}

	let result;
	switch (unary.getTag()) {
		case "Bitwise.Not":
			result = ~bi;
			break;
		case "Bitwise.BitLength":
			result = BigInt(bi.toString(2).length);
			break;
		case "Bitwise.BitCount":
			result = BigInt(bi.toString(2).replace(/0/g, "").length);
			break;
	}
	
	unary.replaceBy(
		CanonicalArithmetic.canonical2InternalNumber(
			new CanonicalArithmetic.Integer(result)
		)
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
