package worlds;
 
import com.haxepunk.World;
import entities.Block;
 
class GameWorld extends World
{
 
    public function new()
    {
        super();
    }
     
    public override function begin()
    {
        add(new Block(30, 50));
    } 
}