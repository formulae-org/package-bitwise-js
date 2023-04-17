/*
Fōrmulæ bitwise package. Module for edition.
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

Bitwise.setEditions = function() {
	Formulae.addEdition(this.messages.pathBitwise, null, this.messages.leafBitLength, () => Expression.wrapperEdition ("Bitwise.BitLength"));
	Formulae.addEdition(this.messages.pathBitwise, null, this.messages.leafBitCount, () => Expression.wrapperEdition ("Bitwise.BitCount"));
	
	[ "And", "Or" ].forEach(
		tag => Formulae.addEdition(
			Bitwise.messages.pathBitwise,
			null,
			Bitwise.messages["leaf" + tag],
			() => Expression.multipleEdition("Bitwise." + tag, 2, 0)
		)
	);
	
	Formulae.addEdition(this.messages.pathBitwise, null, this.messages.leafNot, () => Expression.wrapperEdition ("Bitwise.Not"));
	
	[ "XOr", "LeftShift", "RightShift", "SetBit", "ClearBit", "FlipBit", "GetBit", "TestBit" ].forEach(
		tag => Formulae.addEdition(
			Bitwise.messages.pathBitwise,
			null,
			Bitwise.messages["leaf" + tag],
			() => Expression.multipleEdition("Bitwise." + tag, 2, 0)
		)
	);
};
