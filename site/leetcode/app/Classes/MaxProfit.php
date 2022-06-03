<?php 
namespace App\Classes;

use Illuminate\Support\Facades\Log;

/**
 * @ref https://leetcode.com/problems/best-time-to-buy-and-sell-stock/
 */
class MaxProfit {
	function __construct() {
	}

	function maxProfit($prices) {
		$len = count($prices);
		for($i=$len-2;$i>=0; $i--) {
			$prices[$i+1] = $prices[$i+1] - $prices[$i];
		}
		$prices = array_slice($prices, 1);
		Log::info($prices);

		$sum = 0;
		$maxSum = - PHP_FLOAT_MAX;
		for($i=0;$i<$len-1;$i++) {
			$sum = max($sum + $prices[$i], $prices[$i]);
			$maxSum = max($maxSum, $sum);
		}
		Log::info($maxSum);
		return $maxSum;
	}

	/**
	 * @param Integer $s the sth day
	 */
	function _calculate_bf($s, &$prices) {
		$LEN = count($prices);
		if ($s >= $LEN) {
			return 0;
		}
		$max = -PHP_FLOAT_MAX;
		for($s=0;$s<$LEN;$s++) {
			for($i=$s+1; $i<$LEN-1;$i++) {
				$sum = 0;
				$maxProfit = 0;
				// only check positive profit
				if ($prices[$i] > $prices[$s]) {
					$sum += $prices[$i] - $prices[$s];
					$sum += $this->_calculate_bf($i+1, $prices);
					$maxProfit = max($maxProfit, $sum);
				}
			}
			$max = max($max, $maxProfit);
		}

		return $max;
	}

	function _calculate_peak_valley(&$prices) {
		$peak = $prices[0];
		$valley = $prices[0];
		$i = 0;
		$LEN = count($prices);
		$maxProfit = 0;

		while($i < $LEN-1) {
			while($i < $LEN-1 && $prices[$i] >= $prices[$i+1] ) {
				$i++;
			}
			$valley = $prices[$i];
			while($i < $LEN-1 && $prices[$i] <= $prices[$i+1]) {
				$i++;
			}
			$peak = $prices[$i];
			$maxProfit += $peak - $valley;
		}
		return $maxProfit;
	}

	function maxProfitII($prices) {
		// $sum = $this->_calculate_bf(0, $prices);
		$sum = $this->_calculate_peak_valley($prices);
		return $sum;
	}
}