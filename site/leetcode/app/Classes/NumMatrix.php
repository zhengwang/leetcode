<?php

namespace App\Classes;

use Illuminate\Support\Facades\Log;

/**
 * @ref https://leetcode.com/problems/range-sum-query-2d-immutable/solution/
 */
class NumMatrix
{
	function __construct($matrix)
	{
		$this->dp = [];
		$ROWS = count($matrix);
		$COLS = count($matrix[0])+1;

		for($i=0;$i<$ROWS;$i++) {
			$this->dp[$i] = [];
			$this->dp[$i][0] = 0;
		}

		for($i=0;$i<$ROWS; $i++) {
			for($j=0;$j<$COLS-1; $j++) {
				$this->dp[$i][$j+1] = $this->dp[$i][$j] + $matrix[$i][$j];
			}
		}
	}

	/**
	 * @param Integer $row1
	 * @param Integer $col1
	 * @param Integer $row2
	 * @param Integer $col2
	 * @return Integer
	 */
	function sumRegion($row1, $col1, $row2, $col2)
	{
		$sum = 0;
		for($r=floatval($row1);$r<=$row2;$r++) {
			$sum += ($this->dp[$r][intval($col2)+1] - $this->dp[$r][$col1]);
		}

		return $sum;
	}
}
