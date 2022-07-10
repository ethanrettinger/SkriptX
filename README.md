# SkriptX
SkriptX transpiles an object-oriented strictly-typed and sauced up syntax to Skript

## Examples


### Hello World
```
class Main {
  int init() {
    broadcast "Hello, world!";
    stored string Testvar = "I am a variable stored in the skript variables.csv file!";
    global string Tempvar = "I am stored only in memory!";
    local string Localvar = "I am stored only in memory and the current scope!";
    broadcast "%Testvar%";
    return 0;
  }

}
```

> SkriptX Code

```
load:
  broadcast formatted "Hello, world!"
  set {SKRIPTX::VARIABLES::Testvar} to "I am a variable stored in the skript variables.csv file!"
  set {-SKRIPTX::VARIABLES::Tempvar} to "I am only stored in memory!
  set {_SKRIPTX::VARIABLES::Localvar} to "I am stored only in memory and the current scope!"
  broadcast formatted {SKRIPTX::VARIABLES::Testvar}
  stop
```

> Skript code (requires proper configuration for Tempvar)

### Give command

```

class Main {
  Command give(player Player = this.executor, item Item = dirt, number quantity = 1) {
    options {
      executable by: players,
      permission: administrator
    }
    give quantity of Item to Player;
    send "&aYou were given %quantity% %Item%" to this.executor
  }
}
 ```
 
 > SkriptX Code
 
 ```
 command give <player = sender> <item = dirt> <number = 1>:
  executable by: players
  permission: administrator
  trigger:
    give arg-3 of arg-2 to arg-1
    send "&aYou were given %arg-3% %arg-2%"
  ```

> Skript Code

### GUI

```
class Main {

  int init() {
    # Create GUI upon server creation to save memory usage
    # GUI will not be loaded onto the server until initialized in init() function
    
    # GUI with 4 rows
    Inv(4, "Generic Inventory")
  }
  
  ChestInventory Inv(int Rows, string Name) {
    # TODO: Change "name" from unique identifier to use metadata"
    const string[] Lore = [
      "Line 1",
      "Line 2",
      "Line 3"
    ]
    this.slots[all numbers from 0 to Rows * 9 - 1] = item
      .fromId("gray_stained_glass_pane")
      .setName("&7")
      .setLore(Lore)
      .onClick = void() {
        cancel event;
      }
  }
  
  Command openGui() {
  
    options {
      executable by: players
    }
    
    Inv.open(this.executor)
    
  }
}
```
> SkriptX Code

```
load:
  set {_SKRIPTX::VARIABLES::Lore::*} to "Line 1", "Line 2" and "Line 3"
  set {-SKRIPTX::CHESTINVENTORY::Inv} to chest inventory with size 4 named "Generic Inventory"
  set slot (all numbers from 0 to 4 * 9 - 1) of {-SKRIPTX::CHESTINVENTORY::Inv} to Gray Stained Glass Pane named "&7" with lore {_SKRIPTX::VARIABLES::Lore::*}:
  cancel event
  
    
Command /openGui:
  executable by: players
  trigger:
    open {-SKRIPTX::CHESTINVENTORY::Inv} to player
```

> Skript Code

# Q&A

## Q: This seems pointless.
> A: Correct. It's simply to expand my knowledge of programming languages for the future, as well as enhance my knowledge of JavaScript as a whole.

## Q: How does it work?
> A: You pass a skript file into a nodejs command and it will automatically transpile the file for you. The file will be uploaded to your server as SKX_(filename).sk. You need to enable memvars in your config and prefix them with - in order for it to work properly.

## Q: Does this optimize code during transpilation?
> A: No.

## Q: This syntax is fucking weird
> A: That's what you get when you mix english with object oriented programming.

## Q: What addons are required?
> A: The transpiler will tell you if you need addons. For safe keeping, install `skript-gui` and `SkBee`.

## Q: It seems like a lot more writing than skript
> A: In the short term, yes, there is a lot more boilerplate code required to run simple things with Skript, which kind of defeats the purpose of skript anyways. Once you start to expand upon your code, the code may be multiple times shorter than skript. The point is to be consistent and give expected results. Separate your code into multiple files and consolidate them into one executable file with imports.

## Q: Why not just compile it to bytecode?
> A: I don't know how, and don't intend on learning java or the convoluted process of compiling to bytecode. Also, I know skript rather well.

## Q: Can it run DOOM?
> A: I suppose if someone wanted to.
