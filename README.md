yarn-vite-bug
![](https://i.imgur.com/asNlZXu.png)

Deep dependencies are not properly resolved inside workspace with virtual paths

## To reproduce
`yarn && yarn workspace app dev`

## Fix
uncomment this line:
https://github.com/AlexandreBonaventure/yarn-rollup-symlink/blob/master/packages/app/build.js#L24

You have to pass preserveSymlinks: true as a rollup option