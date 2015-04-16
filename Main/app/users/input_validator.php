<?php
class InputValidator {
	public function escape($src) {
		$result = $src;
		$result = str_replace("\\","\\\\",$result);
		$result = str_replace("'","\'",$result);
		$result = str_replace("&","&amp;",$result);
		$result = str_replace("<","&lt;",$result);
		$result = str_replace(">","&gt;",$result);
		$result = str_ireplace("javascript:","javascript_:",$result);
		return trim($result);
	}
}
