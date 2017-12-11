import pygame

FRONT = (24, 36, 55)
BACK = (44, 65, 100)
BRICK = (162, 81, 63)
WALL = (108, 108, 108)
SPAWN = (206, 56, 22)
EAGLE = (192, 118, 35)
WATER = (24, 54, 87)
LEAVES = (0, 34, 5)
TANK = (60, 84, 17)

# This sets the WIDTH and HEIGHT of each grid location
WIDTH = 20
HEIGHT = 20
MARGIN = 2

spawn_counter = 0
enemy_counter = 0

grid = []
for row in range(20):
    grid.append([])
    for column in range(27):
        grid[row].append(0)

map_name = input("Enter map title: ")
while spawn_counter < 1:
    spawn_counter = int(input("Enter spawn points counter: "))
    if spawn_counter < 1:
        print("There must be more spawn points.")
while enemy_counter < 1:
    enemy_counter = int(input("Enter enemy counter: "))
    if enemy_counter < 1:
        print("There must be at least one enemy.")
spawn_x = int(input("Enter spawn X (from 0 to 24, middle: 12): "))
spawn_y = int(input("Enter spawn Y (from 0 to 19, middle: 10): "))
grid[spawn_y][spawn_x] = 6
eagle_x = int(input("Enter eagle X (from 0 to 24, middle: 12): "))
eagle_y = int(input("Enter eagle Y (from 0 to 19, middle: 10): "))
grid[eagle_y][eagle_x] = 7

pygame.init()
WINDOW_SIZE = [594, 472]
screen = pygame.display.set_mode(WINDOW_SIZE)
pygame.display.set_caption("Map Generator")
done = False
clock = pygame.time.Clock()

tile_choosen = 0
while not done:
    for event in pygame.event.get():
        if event.type == pygame.QUIT:
            done = True
        elif event.type == pygame.MOUSEBUTTONDOWN:
            pos = pygame.mouse.get_pos()
            if pos[0] < 594 and pos[1] < 472:
                try:
                    if pos[0] < 552 and pos[1] < 442:
                        column = pos[0] // (WIDTH + MARGIN)
                        row = pos[1] // (HEIGHT + MARGIN)
                        if (grid[row][column] != 6) and (grid[row][column] != 7):
                            if grid[row][column] != tile_choosen:
                                grid[row][column] = tile_choosen
                            elif grid[row][column] == tile_choosen:
                                grid[row][column] = 0
                            print("Changed ", pos, "on coordinates: ", row, column)
                    elif 552 < pos[0] < 594 and pos[1] < 442:
                        column_tiles = pos[0] // (WIDTH + MARGIN)
                        row_tiles = pos[1] // (HEIGHT + MARGIN)
                        tile_choosen = grid[row_tiles][column_tiles]
                    elif 0 < pos[0] < 594 and 442 < pos[1] < 472:
                        map_save()
                except IndexError:
                    print("Out of bound exception, try again")
    screen.fill(BACK)

    # Draw the grid
    for row in range(20):
        for column in range(25):
            color = FRONT
            if grid[row][column] == 1:
                color = BRICK
            if grid[row][column] == 2:
                color = WALL
            if grid[row][column] == 3:
                color = WATER
            if grid[row][column] == 4:
                color = LEAVES
            if grid[row][column] == 5:
                color = SPAWN
            if grid[row][column] == 6:
                color = TANK
            if grid[row][column] == 7:
                color = EAGLE
            pygame.draw.rect(screen, color, [(MARGIN + WIDTH) * column + MARGIN,
                                             (MARGIN + HEIGHT) * row + MARGIN, WIDTH, HEIGHT])

    grid[8][26] = 1
    grid[9][26] = 2
    grid[10][26] = 3
    grid[11][26] = 4
    grid[12][26] = 5

    for row in range(7, 13):
        if grid[row][26] == 0:
            color = FRONT
        if grid[row][26] == 1:
            color = BRICK
        if grid[row][26] == 2:
            color = WALL
        if grid[row][26] == 3:
            color = WATER
        if grid[row][26] == 4:
            color = LEAVES
        if grid[row][26] == 5:
            color = SPAWN
        if grid[row][26] == tile_choosen:
            pygame.draw.rect(screen, (255,255,255), [(MARGIN + WIDTH) * 26 + MARGIN,
                                         (MARGIN + HEIGHT) * row + MARGIN, WIDTH, HEIGHT])
        pygame.draw.rect(screen, color, [(MARGIN + WIDTH) * 26 + 2 + MARGIN,
                                         (MARGIN + HEIGHT) * row + 2 + MARGIN, WIDTH - 4, HEIGHT - 4])

    pygame.draw.rect(screen, FRONT, [2, 444, 590, 26])
    label = pygame.font.SysFont("monospace", 15).render(
        "GENERATE", 1, (255, 255, 255))
    screen.blit(label, (260, 450))

    def map_save():

        spawn_checker = 0

        f = open(map_name + '.json', 'w')
        f.write('{' + '\n')
        f.write('"start_point": {' + '\n')
        f.write('"x": ' + str(spawn_x) + ',\n')
        f.write('"y": ' + str(spawn_y) + '\n')
        f.write('},' + '\n')
        f.write('"enemy_spawn": [' + '\n')
        for x in range(0, 25):
            for y in range(0, 20):
                if grid[y][x] == 5:
                    spawn_checker += 1
                    f.write('{\n')
                    f.write('"x": ' + str(x) + ',\n')
                    f.write('"y": ' + str(y) + '\n')
                    f.write("}\n")
                    f.write(",\n")
        f.close()
        r = open(map_name + '.json')
        lines = r.readlines()
        r.close()
        f = open(map_name + '.json', 'w')
        f.writelines([item for item in lines[:-1]])
        f.write('],' + '\n')
        f.write('"spawn_counter": ' + str(spawn_counter) + ',\n')
        f.write('"enemy_counter": ' + str(enemy_counter) + ',\n')
        f.write('"eagle": {' + '\n')
        f.write('"x": ' + str(eagle_x) + ',\n')
        f.write('"y": ' + str(eagle_y) + '\n')
        f.write('},' + '\n')
        f.write('"brick": [' + '\n')
        for x in range(0, 25):
            for y in range(0, 20):
                if grid[y][x] == 1:
                    f.write('{\n')
                    f.write('"x": ' + str(x) + ',\n')
                    f.write('"y": ' + str(y) + '\n')
                    f.write("}\n")
                    f.write(",\n")
        f.close()
        r = open(map_name + '.json')
        lines = r.readlines()
        r.close()
        f = open(map_name + '.json', 'w')
        f.writelines([item for item in lines[:-1]])
        f.write('],' + '\n')
        f.write('"walls": [' + '\n')
        for x in range(0, 25):
            for y in range(0, 20):
                if grid[y][x] == 2:
                    f.write('{\n')
                    f.write('"x": ' + str(x) + ',\n')
                    f.write('"y": ' + str(y) + '\n')
                    f.write("}\n")
                    f.write(",\n")
        f.close()
        r = open(map_name + '.json')
        lines = r.readlines()
        r.close()
        f = open(map_name + '.json', 'w')
        f.writelines([item for item in lines[:-1]])
        f.write('],' + '\n')
        f.write('"water": [' + '\n')
        for x in range(0, 25):
            for y in range(0, 20):
                if grid[y][x] == 3:
                    f.write('{\n')
                    f.write('"x": ' + str(x) + ',\n')
                    f.write('"y": ' + str(y) + '\n')
                    f.write("}\n")
                    f.write(",\n")
        f.close()
        r = open(map_name + '.json')
        lines = r.readlines()
        r.close()
        f = open(map_name + '.json', 'w')
        f.writelines([item for item in lines[:-1]])
        f.write('],' + '\n')
        f.write('"leaves": [' + '\n')
        for x in range(0, 25):
            for y in range(0, 20):
                if grid[y][x] == 4:
                    f.write('{\n')
                    f.write('"x": ' + str(x) + ',\n')
                    f.write('"y": ' + str(y) + '\n')
                    f.write("}\n")
                    f.write(",\n")
        f.close()
        r = open(map_name + '.json')
        lines = r.readlines()
        r.close()
        f = open(map_name + '.json', 'w')
        f.writelines([item for item in lines[:-1]])
        f.write(']' + '\n')
        f.write('}' + '\n')
        f.close()
        if spawn_checker != spawn_counter:
            print("THERE IS ERROR, TOO MUCH OR TO LESS SPAWN POINTS!")
        print("MAP EXPORTED")

        answer = input("Do you want to add it to map list? (Y/y): ")
        if answer == 'Y' or answer == 'y':
            r = open('map_list.json')
            lines = r.readlines()
            r.close()
            f = open('map_list.json', 'w')
            f.writelines([item for item in lines[:-2]])
            f.write(",\n")
            f.write('"' + str(map_name) + '.json"')
            f.write(']' + '\n')
            f.write('}' + '\n')
            f.close()
        pass

    clock.tick(60)
    pygame.display.flip()

pygame.quit()
