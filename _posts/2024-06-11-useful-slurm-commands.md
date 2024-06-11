---
title: "useful slurm commands"
classes: wide
tags:
  - bash
  - slurm
  - compute cluster
---

`SLURM` (Simple Linux Utility for Resource Management) is a powerful and widely used job scheduler for high-performance computing (HPC) systems. It helps manage and allocate resources efficiently across compute clusters. In this post, we’ll explore some of the most useful `SLURM` commands to help you manage your jobs and monitor resources effectively.

### Job submission

#### `sbatch`
The `sbatch` command is used to submit a job script to the `SLURM` scheduler.
```bash
sbatch path/to/script.sh
```

### Job queue monitoring

#### `squeue`
The `squeue` command displays information about jobs in the queue. You can view jobs for a specific user with the `-u` option.
```bash
squeue -u <your_username>
```
Common job states you might encounter in the output of squeue include:
- PD (Pending): The job is waiting to be scheduled.
- R (Running): The job is currently running.
- CG (Completing): The job is finishing its processes.
- CD (Completed): The job has finished successfully.
- F (Failed): The job has failed.

#### `scontrol show job`

```bash
scontrol show job <job_id>
```
The `<job_id>` can be found in one of the columns in the output of `squeue`.

### Job management

#### `scancel`
The `scancel` command is used to cancel a job. You can cancel all jobs for a specific user with the `-u` option.

```bash
scancel -u <your_username>
```

Here are the more common `slurm` commands I use. For more information, please refer to the [official documentation](https://slurm.schedmd.com/) to know more about `sacct`, `sacctmgr`, `salloc`, `sattach`, `sbcast`, `scrontab`, `sdiag`, `sh5util`, `sinfo`, `sprio`, `sreport`, `srun`, `sshare`, `sstat`, `strigger` and `sview`