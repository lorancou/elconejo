import com.haxepunk.Engine;
import com.haxepunk.HXP;

class Main extends Engine
{

	override public function init()
	{
#if debug
		HXP.console.enable();
#end
		HXP.screen.scale = 1;
		HXP.world = new worlds.GameWorld();
	}

	public static function main() { new Main(); }

}